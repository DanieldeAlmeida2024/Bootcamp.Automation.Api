"""Testes documentais; nao validam o comportamento dos exercicios."""
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]

class TesteDocumentacao(unittest.TestCase):
    def test_arquivos_necessarios(self):
        for caminho in ("README.md", "AGENTS.md", "docs/REQUISITOS.md", "docs/ARQUITETURA.md", "docs/UML.puml", "docs/PLANO_TESTES.md"):
            with self.subTest(caminho=caminho):
                self.assertTrue((RAIZ / caminho).is_file())

    def test_uml(self):
        texto = (RAIZ / "docs/UML.puml").read_text(encoding="utf-8")
        self.assertIn("@startuml", texto)
        self.assertIn("@enduml", texto)

if __name__ == "__main__":
    unittest.main()
