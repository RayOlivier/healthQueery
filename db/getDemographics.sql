-- SELECT demographic
-- FROM demographics
-- WHERE doctor_id = $1 

SELECT ARRAY(SELECT demographic 
FROM demographics 
WHERE doctor_id=$1)