-- SELECT specialty
-- FROM specialties
-- WHERE doctor_id = $1 

SELECT array(SELECT specialty
FROM specialties
WHERE doctor_id = $1)