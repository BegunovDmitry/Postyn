from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    HOST: str
    DB_NAME: str
    DB_PASSWORD: str
    DB_USER: str
    PORT: str

    model_config = SettingsConfigDict(env_file='.env')

settings = Settings()


