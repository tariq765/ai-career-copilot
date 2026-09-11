from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_session
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.all_models import User
from app.schemas.auth_schemas import UserRegister, UserLogin, AuthResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=AuthResponse)
async def register_user(user_in: UserRegister, session: AsyncSession = Depends(get_session)):
    stmt = select(User).where(User.email == user_in.email)
    result = await session.execute(stmt)
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )
    
    new_user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        target_role=user_in.target_role,
        hashed_password=get_password_hash(user_in.password),
        auth_provider="email"
    )
    
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    
    token = create_access_token(subject=new_user.id)
    
    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse(
            id=new_user.id,
            email=new_user.email,
            full_name=new_user.full_name,
            target_role=new_user.target_role,
            avatar_url=new_user.avatar_url,
            auth_provider=new_user.auth_provider,
            created_at=new_user.created_at
        )
    )

@router.post("/login", response_model=AuthResponse)
async def login_user(login_in: UserLogin, session: AsyncSession = Depends(get_session)):
    stmt = select(User).where(User.email == login_in.email)
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user or not user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password."
        )
        
    if not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password."
        )
        
    token = create_access_token(subject=user.id)
    
    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            target_role=user.target_role,
            avatar_url=user.avatar_url,
            auth_provider=user.auth_provider,
            created_at=user.created_at
        )
    )

@router.post("/forgot-password")
async def forgot_password(data: dict, session: AsyncSession = Depends(get_session)):
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required.")
    
    stmt = select(User).where(User.email == email.strip().lower())
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="No account found with this email address.")
    
    reset_token = create_access_token(subject=user.id)
    return {
        "message": "Password reset token generated successfully.",
        "email": user.email,
        "reset_token": reset_token,
        "reset_url": f"/reset-password?token={reset_token}"
    }

@router.post("/reset-password")
async def reset_password(data: dict, session: AsyncSession = Depends(get_session)):
    token = data.get("token")
    new_password = data.get("new_password")
    
    if not token or not new_password:
        raise HTTPException(status_code=400, detail="Token and new password are required.")
    
    if len(new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters long.")
    
    from jose import jwt
    from app.core.config import settings
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired reset token.")
    
    stmt = select(User).where(User.id == user_id)
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    user.hashed_password = get_password_hash(new_password)
    session.add(user)
    await session.commit()
    
    return {"message": "Your password has been successfully reset. You can now log in."}
