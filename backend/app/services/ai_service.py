import os
import json
import logging
from typing import Type, TypeVar, Optional, Dict, Any
from abc import ABC, abstractmethod
from pydantic import BaseModel
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)
T = TypeVar("T", bound=BaseModel)

class BaseLLMProvider(ABC):
    @abstractmethod
    async def generate_structured(self, prompt: str, schema: Type[T], system_prompt: Optional[str] = None) -> T:
        """Generate a response strictly matching the Pydantic schema."""
        pass

    @abstractmethod
    async def generate_text(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Generate text output."""
        pass


class OpenRouterCompatibleProvider(BaseLLMProvider):
    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or settings.AI_API_KEY
        self.base_url = (base_url or settings.AI_BASE_URL or "https://openrouter.ai/api/v1").rstrip("/")
        self.model = model or settings.AI_MODEL_NAME

    async def generate_text(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        if not self.api_key:
            return "AI API Key is not configured. Returning fallback analysis."
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://ai-career-copilot.app",
            "X-Title": "AI Career Copilot"
        }
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.2
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(f"{self.base_url}/chat/completions", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data["choices"][0]["message"]["content"]

    async def generate_structured(self, prompt: str, schema: Type[T], system_prompt: Optional[str] = None) -> T:
        schema_json = json.dumps(schema.model_json_schema(), indent=2)
        strict_system = (
            (system_prompt or "You are a specialized career AI assistant.") +
            f"\n\nIMPORTANT: You MUST respond ONLY with a valid JSON object matching this JSON Schema:\n{schema_json}\nDo not include Markdown backticks (```json) or conversational text. Output pure JSON only."
        )

        raw_response = await self.generate_text(prompt=prompt, system_prompt=strict_system)
        
        # Clean potential markdown wrapping
        cleaned = raw_response.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()

        try:
            parsed_dict = json.loads(cleaned)
            return schema.model_validate(parsed_dict)
        except Exception as e:
            logger.error(f"Failed to parse AI output into schema {schema.__name__}: {e}\nRaw output: {raw_response}")
            raise ValueError(f"AI response did not strictly match required schema: {str(e)}")


def get_ai_provider() -> BaseLLMProvider:
    # Factory function for pluggable AI Providers (OpenRouter, OpenAI, Gemini)
    return OpenRouterCompatibleProvider()
