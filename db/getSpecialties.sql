-- SELECT specialty
-- FROM specialties
-- WHERE doctor_id = $1 

-- SELECT array(SELECT specialty
-- FROM specialties
-- WHERE doctor_id = $1)

SELECT ARRAY(SELECT specialty_name 
FROM specialties s
    JOIN doctor_specialties ds on s.specialty_id= ds.specialty_id
    JOIN doctors doc ON doc.doctor_id = ds.doctor_id
WHERE ds.doctor_id=$1)