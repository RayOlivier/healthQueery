SELECT ARRAY(SELECT doctor_id
FROM favorites
WHERE user_id=$1)