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

-- SELECT doc.doctor_id, array_agg(dd.demographic_id)
-- FROM doctors doc
--     JOIN doctor_demographics dd on doc.doctor_id = dd.doctor_id
--     GROUP BY doc.doctor_id

-- SELECT doc.doctor_id, array_agg(dem.demographic_name)
-- FROM doctors doc
--     JOIN doctor_demographics dd on doc.doctor_id = dd.doctor_id
--     JOIN demographics dem on dd.demographic_id = dem.demographic_id
--     GROUP BY doc.doctor_id



------------dont work
-- SELECT 
-- -- *
-- doc.doctor_id
-- ,  array_agg(dem.demographic_name)
-- -- , array_agg(spec.specialty_name)
-- FROM doctors doc
--     JOIN doctor_demographics dd on doc.doctor_id = dd.doctor_id
--     JOIN demographics dem on dd.demographic_id = dem.demographic_id
--     JOIN doctor_specialties ds on doc.doctor_id=ds.doctor_id
--     JOIN specialties spec on ds.specialty_id = spec.specialty_id

-- GROUP BY doc.doctor_id