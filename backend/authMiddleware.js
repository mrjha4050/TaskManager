const admin = require('./firebaseAdmin'); 

const verifyToken = async (req, res, next) => {
  const token = req.body.token;   

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;  
    next();   
  } catch (error) {
    console.error('Error verifying token:', error); 
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;