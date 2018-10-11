UPDATE doctors
SET doctor_name = $1,
    category= $2,
    street_address= $3,
    city= $4,
    state= $5,
    description= $6,
    practice_name= $7,
    img_url= $8,
    website_url= $9,
    phone= $10,
    nb_inclusive= $11,
    email= $12,
    gender= $13

WHERE doctor_id = $14;