-- SELECT *
-- FROM doctors
-- WHERE metroplex=$1;
SELECT doc.doctor_id, doc.doctor_name, doc.category, doc.practice_name, doc.street_address, doc.city, doc.state, doc.nb_inclusive, doc.metroplex, array_agg(DISTINCT dem.demographic_name) as demographics, array_agg(DISTINCT spec.specialty_name) as specialties
FROM doctors doc
    JOIN doctor_demographics dd on doc.doctor_id = dd.doctor_id
    JOIN demographics dem on dd.demographic_id = dem.demographic_id
    JOIN doctor_specialties ds on doc.doctor_id=ds.doctor_id
    JOIN specialties spec on ds.specialty_id = spec.specialty_id
WHERE metroplex=$1
GROUP BY doc.doctor_id
