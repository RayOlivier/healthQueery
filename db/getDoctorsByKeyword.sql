SELECT DISTINCT doc.doctor_id
FROM doctors doc
    JOIN specialties s ON doc.doctor_id = s.doctor_id
    JOIN demographics dem ON dem.doctor_id = doc.doctor_id
WHERE doctor_name ILIKE $1
    OR category ILIKE $1 OR practice_name ILIKE $1 OR street_address ILIKE $1 OR city ILIKE $1 OR state ILIKE $1 OR description ILIKE $1 OR specialty ILIKE $1 OR demographic ILIKE $1

    --HAD TO DISABLE SQL PREDICTION THING ON BOTTOM RIGHT TO USE ILIKE