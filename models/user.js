const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
    },
});

///las funciiones de flecha no cambian el valor que apunta el this
UserSchema.method('toJSON', function() {
    const { __v, online, _id, password, ...object } = this.toObject(); ///...object le estoy diciendo que las demas propiedades seran extraiadas a una nueva propiedad llamada object
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);