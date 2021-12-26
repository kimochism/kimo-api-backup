const { 
    SENDGRID_API_KEY,
    STORE_EMAIL 
} = process.env;

const sendgridConfig = {
    api_key: SENDGRID_API_KEY,
    from_email: STORE_EMAIL,
};

export default sendgridConfig;