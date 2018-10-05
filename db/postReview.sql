INSERT INTO reviews
    (time_posted, user_id, doctor_id, title, rating, body)
VALUES
    (CURRENT_TIMESTAMP, $1, $2, $3, $4, $5);