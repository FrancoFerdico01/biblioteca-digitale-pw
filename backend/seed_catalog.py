"""Importa manualmente libri ed eventi di esempio nel database.

Normalmente non serve: il backend lo esegue già all'avvio.

Esecuzione, dalla cartella backend:
    .\\.venv\\Scripts\\python.exe seed_catalog.py
"""

from app.catalog_seed import seed_catalog
from app.database import Base, engine

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print(seed_catalog())
