
# Wykonanie zadania - Michał Sałek
[https://www.linkedin.com/in/michal-salek/](https://www.linkedin.com/in/michal-salek/)
### Możliwości:  
1. Dodanie książki:

- Nie trzeba przechodzić do nowego widoku
- Walidacja uzupełnienia pól (wyłączenie buttona)
- Walidacja numeru ISBN na froncie, dzięki czemu wiadomo w czasie rzeczywistym, czy numer jest poprawny
- Czyszczenie pól po wysyłce i aktualizacja listy
2. Lista książek:
- Pływająca belka tytułowa tabeli
- Najnowsze wpisy pojawiają się na samej górze
- Paginacja działająca na zasadzie odpytywania o kolejne strony
- Numerki oznaczające ilość recenzji, które posiada dana książka
- Podświetlanie rekordów
- Automatyczne odświeżanie listy co 30 sekund
3. Przycisk Scroll To Top (bez jQuery :-))
4. Edycja książki:
- Takie same walidacje, jak w przypadku dodawania
- Data wybierana pickerem, ale przesyłana nadal w formacie ISO
- Sprawdzanie "sum kontrolnych" i nie pozwolenie na podmianę niezmienionych rekordów
- Gdy pola będą zmienione, a ISBN nieprawidłowy - wciąż nie można zaktualizować książki
5. Recenzje:
- Dodawanie odbywa się w taki sam sposób, jak dodawanie książki
- Możliwość oceniania w skali gwiazdkowej
- Tu również nie można wysłać pustej recenzji
- Paginacja odbywa się tym razem na froncie
- Można wybrać ilość wyświetlanych wierszy (5, 10, 20)
