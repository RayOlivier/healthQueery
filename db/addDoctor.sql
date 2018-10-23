INSERT INTO doctors
    (doctor_name,
    category,
    street_address,
    city,
    state,
    description,
    practice_name,
    img_url,
    website_url,
    phone,
    nb_inclusive,
    email,
    gender,
    metroplex)
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)