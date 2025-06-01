DROP TYPE IF EXISTS categorie_enum CASCADE;
DROP TYPE IF EXISTS tipuri_produse CASCADE;


CREATE TYPE categorie_enum AS ENUM('comanda speciala', 'editie limitata', 'accesorii premium', 'pentru copii', 'standard');
CREATE TYPE tipuri_produse AS ENUM('fire', 'imbracaminte', 'jucarii', 'accesorii');

DROP TABLE IF EXISTS produse;

CREATE TABLE produse (
    id SERIAL PRIMARY KEY,
    nume TEXT NOT NULL,
    descriere TEXT NOT NULL,
    imagine TEXT NOT NULL,
    tip_produs tipuri_produse DEFAULT 'fire',
    categorie categorie_enum DEFAULT 'standard',
    material TEXT NOT NULL,
    culoare TEXT NOT NULL,
    tara_origine TEXT NOT NULL,
    pret NUMERIC(6,2) NOT NULL,
    grosime_fir NUMERIC(4,1),
    tehnici TEXT,
    data_adaugare DATE NOT NULL,
    pentru_crosetat BOOLEAN NOT NULL,
    pentru_tricotat BOOLEAN NOT NULL
);


INSERT INTO produse (nume, descriere, imagine, tip_produs, categorie, material, culoare, tara_origine, pret, grosime_fir, tehnici, data_adaugare, pentru_crosetat, pentru_tricotat) VALUES
('Fir Lana Alb', 'Fir de lână moale ideal pentru tricotaje de iarnă.', 'fir_lana_alb.jpg', 'fire', 'standard', 'lana', 'alb', 'Romania', 15.50, 3.5, 'tricotat,crosetat', '2023-09-01', TRUE, TRUE),
('Fir Bumbac Rosu', 'Fir 100% bumbac pentru creații fine.', 'fir_bumbac_rosu.jpg', 'fire', 'standard', 'bumbac', 'rosu', 'Italia', 12.00, 2.0, 'crosetat', '2023-09-10', TRUE, FALSE),
('Caciula Lana Neagra', 'Căciulă handmade tricotată din lână.', 'caciula_lana_neagra.jpg', 'imbracaminte', 'editie limitata', 'lana', 'negru', 'Romania', 40.00, 4.0, 'tricotat', '2023-10-05', FALSE, TRUE),
('Caciula Bumbac Albastra', 'Căciulă croșetată din bumbac, ideală pentru primăvară.', 'caciula_bumbac_albastra.jpg', 'imbracaminte', 'editie limitata', 'bumbac', 'albastru', 'Franta', 35.00, 2.5, 'crosetat', '2023-10-07', TRUE, FALSE),
('Fular Lana Verde', 'Fular gros și călduros din lână naturală.', 'fular_lana_verde.jpg', 'imbracaminte', 'comanda speciala', 'lana', 'verde', 'Germania', 45.00, 5.0, 'tricotat', '2023-11-01', FALSE, TRUE),
('Pulover Lana Gri', 'Pulover tricotat unisex din lână merinos.', 'pulover_lana_gri.jpg', 'imbracaminte', 'standard', 'lana', 'gri', 'Austria', 60.00, 4.5, 'tricotat', '2023-11-10', FALSE, TRUE),
('Pulover Bumbac Galben', 'Pulover ușor și respirabil croșetat manual.', 'pulover_bumbac_galben.jpg', 'imbracaminte', 'standard', 'bumbac', 'galben', 'Spania', 50.00, 3.0, 'crosetat', '2023-11-20', TRUE, FALSE),
('Patura Lana Portocalie', 'Pătură groasă din lână naturală, ideală pentru sezon rece.', 'patura_lana_portocalie.jpg', 'imbracaminte', 'comanda speciala', 'lana', 'portocaliu', 'Romania', 70.00, 6.0, 'tricotat', '2023-12-01', FALSE, TRUE),
('Jucarie Crosetata Ratusca', 'Jucărie croșetată în formă de rățușcă galbenă.', 'jucarie_ratusca.jpg', 'jucarii', 'editie limitata', 'bumbac', 'galben', 'Romania', 28.00, 2.0, 'crosetat', '2024-01-10', TRUE, FALSE),
('Jucarie Crosetata Iepuras', 'Jucărie croșetată iepuraș alb cu roz.', 'jucarie_iepuras.jpg', 'jucarii', 'pentru copii', 'bumbac', 'alb', 'Romania', 30.00, 2.5, 'crosetat', '2024-01-15', TRUE, FALSE),
('Jucarie Crosetata Dinozaur', 'Dinozaur simpatic tricotat pentru copii.', 'jucarie_dinozaur.jpg', 'jucarii', 'pentru copii', 'lana', 'verde', 'Ungaria', 32.00, 3.0, 'tricotat', '2024-01-20', FALSE, TRUE),
('Ac Bambus 4mm', 'Ac de tricotat din bambus, dimensiune 5mm.', 'ac_bambus.jpg', 'accesorii', 'accesorii premium', 'bambus', 'bej', 'Japonia', 10.00, 4, 'tricotat', '2024-02-01', TRUE, FALSE),
('Ac Metal 3mm', 'Ac tricotat aluminiu, durabil și ergonomic.', 'ac_metal_aluminiu.jpg', 'accesorii', 'accesorii premium', 'metal', 'gri', 'China', 9.00, 3, 'tricotat', '2024-02-02', FALSE, TRUE),
('Ac Metal 2mm', 'Ac tricotat din oțel inoxidabil, 6mm.', 'ac_metal_otel.jpg', 'accesorii', 'accesorii premium', 'metal', 'argintiu', 'Coreea', 11.00, 2, 'tricotat,crosetat', '2024-02-03', FALSE, TRUE),
('Ac Plastic 2.5mm', 'Ac colorat din plastic pentru croșetat.', 'ac_plastic.jpg', 'accesorii', 'standard', 'plastic', 'albastru', 'Romania', 6.00, 2.5, 'crosetat', '2024-02-04', TRUE, FALSE);
