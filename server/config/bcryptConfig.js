const BCRYPT_WORK_FACTOR = 12;

const BCRYPT_MAX_BYTES = 72;

// hash of 'invalidpassword' which is an invalid password
const DUMMY_HASH = '$2b$12$tksIE.4VywlXZuoAhhvM2O0feB65oluLlv6fFsHP16ooXUNugOLDK';

module.exports = { BCRYPT_WORK_FACTOR, BCRYPT_MAX_BYTES, DUMMY_HASH };
