.
├── src/
│ ├── core/ # Podstawowa logika aplikacji
│ │ ├── application/ # Inicjalizacja i konfiguracja główna
│ │ ├── game-loop/ # Zarządzanie cyklem gry (fixed timestep itp)
│ │ └── dependency-injection.ts # Kontener DI
│ │
│ ├── rendering/ # Warstwa renderowania
│ │ ├── pipelines/ # Różne pipeline'y renderowania (2D, WebGL)
│ │ ├── cameras/ # Zarządzanie kamerami
│ │ ├── shaders/ # GLSL/WebGL shaders
│ │ └── canvas-service.ts # Manager canvasu
│ │
│ ├── data/ # Modele danych i stan aplikacji
│ │ ├── models/ # Czyste modele danych (Grid, Player itp)
│ │ ├── repositories/ # Dostęp do danych (localStorage, API)
│ │ └── state/ # Globalny stan (MobX/Redux stores)
│ │
│ ├── game-systems/ # Systemy ECS
│ │ ├── simulation/ # Logika biznesowa (GridSystem, PhysicsSystem)
│ │ ├── rendering/ # Systemy renderujące
│ │ └── input/ # Systemy obsługi inputu
│ │
│ ├── input/ # Obsługa interakcji
│ │ ├── subsystems/ # Implementacje dla różnych urządzeń
│ │ │ ├── mouse/
│ │ │ ├── touch/
│ │ │ └── keyboard/
│ │ └── input-mapper.ts # Mapowanie inputu na akcje
│ │
│ ├── scenes/ # Zarządzanie scenami
│ │ ├── main-scene/ # Główna scena gry
│ │ ├── ui-scene/ # Warstwa UI
│ │ └── scene-manager.ts # Przełączanie scen
│ │
│ ├── services/ # Serwisy aplikacyjne
│ │ ├── event-bus/ # System komunikacji między modułami
│ │ ├── resize-service.ts # Obsługa responsywności
│ │ └── logger.ts # Serwis logowania
│ │
│ ├── types/ # Typy i interfejsy
│ │ ├── core-types.ts # Główne typy aplikacji
│ │ └── ecs-types.ts # Typy dla ECS
│ │
│ ├── utils/ # Narzędzia pomocnicze
│ │ ├── math/ # Funkcje matematyczne
│ │ ├── algorithms/ # Algorytmy specyficzne dla gry
│ │ └── debug-tools.ts # Narzędzia developerskie
│ │
│ ├── config/ # Konfiguracja
│ │ ├── constants.ts # Stałe aplikacji
│ │ └── game-settings.ts # Ustawienia użytkownika
│ │
│ └── assets/ # Zasoby statyczne
│ ├── sprites/ # Obrazki/Textury
│ └── fonts/ # Czcionki
│
├── public/ # Pliki wynikowe
│ ├── index.html
│ └── bundle/ # Zbundowany kod (webpack/rollup)
│
├── docs/ # Dokumentacja
│ ├── architecture.md
│ └── api-reference/
│
├── tests/ # Testy
│ ├── unit/ # Testy jednostkowe
│ └── integration/ # Testy integracyjne
│
├── .storybook/ # Komponenty UI w izolacji
├── tools/ # Skrypty buildowe
└── package.json
