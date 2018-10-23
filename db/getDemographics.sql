-- SELECT demographic
-- FROM demographics
-- WHERE doctor_id = $1 

-- SELECT ARRAY(SELECT demographic 
-- FROM demographics 
-- WHERE doctor_id=$1)


SELECT ARRAY(SELECT demographic_name 
FROM demographics dem
    JOIN doctor_demographics dd on dem.demographic_id= dd.demographic_id
    JOIN doctors doc ON doc.doctor_id = dd.doctor_id
WHERE dd.doctor_id=$1)