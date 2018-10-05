INSERT INTO favorites
    (doctor_id, user_id)
VALUES($1, $2);


SELECT *
FROM favorites
WHERE user_id=$2;