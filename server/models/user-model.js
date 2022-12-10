const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

//The User Model
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email!"
        },
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        validate: {
            validator: val => /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{8,}$/.test(val),
            message: "Passwords must be at least 8 characters long and have an uppercase letter, a lowercase letter, a number and a symbol!"
        },
    },
}, { timestamps: true });

//This function gets the confirmPassword variable from the API Post and sets it to a variable
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

//This function validates the password against the confirmPassword variable
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password!');
    }
    next();
});

//This function uses bcrypt to encrypt the password
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema);
