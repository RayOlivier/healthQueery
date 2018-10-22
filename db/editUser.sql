UPDATE users
SET username=$2,
    sexual_orientation=$3,
    gender=$4
WHERE user_id =$1;

SELECT *
FROM users
WHERE user_id=$1;