# Three Lions Investment Firm

### setup Commands:

    cd backend
    npx sequelize-cli init

    npx sequelize-cli migration:generate --name create-user
    npx sequelize-cli db:migrate

### Testing:

    node create-user.js "john.doe" "johndoe@example.com" "mysecretpassword"

Make a POST request to /api/login with email and password