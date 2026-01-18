import { useState } from 'react'; 

function Login(){ 
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [error,setError] = useState('');
    const demoAccounts = [
    { email: "admin@admin.com", password: "1234" },
    { email: "user@test.com", password: "test123" }
  ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        // FAKE LOGIN
         const isValid = demoAccounts.some(
            acc => acc.email === email && acc.password === password
            );
    
            if (isValid) {
                setIsLoggedIn(true)
            } else {
                setError('Invalid email or password. Try: admin@admin.com / 1234');
    }
        };

            //DASHBOARD

        if (isLoggedIn) {
            return (
            <div className="dashboard" >
                <h1>📋 Task Manager Dashboard</h1>
                <div className="user-info">
                <p>Logged in as: <strong>{email}</strong></p>
                <button onClick={() => setIsLoggedIn(false)}  className="logout-btn">
                    Logout
                </button>
                </div>

                <div className="tasks-preview">
                    <h3>Your tasks will appear here</h3>
                    <p>Next: Build the actual task dashboard!</p>
                </div>
            </div>
            );
        }
    
        

    return(
        <div id="container">
            <div id="login-left">
                <div>
                    <h1>Welcome!</h1>
                    <div className="features"> 
                        <h4>suivis des taches</h4>
                        <p>organiser vos taches par categorie</p>
                    </div>
                    <div className="features"> 
                        <h4>priorites</h4>
                        <p>identifiez les taches urgents</p>
                    </div>
                    <div className="features"> 
                        <h4>statistiques</h4>
                        <p>visualiser votre productivite</p>
                    </div>
                </div>
            </div>
            <div id="login-right">
                
                <form onSubmit={handleSubmit} id="form">
                    <div id="informations">
                        <h2>Connexion</h2>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="pass">Password:</label>
                            
                            <input 
                                type="password"  
                                id="pass" 
                                required 
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                                {error && (<div className="error-message">❌{error}</div>)}
                        </div>
                        <div id="submit">
                            <button type="submit" id="submit-btn">Log In</button>
                            <span><a href="#">forgot password?</a></span>
                        </div>
                        <div id="other-options">
                            <span id="create-acc"><a href="#">dont have an account?</a></span>
                            <div id="other">
                                <span>or</span>
                                <div id="other-ways">
                                    <button type="button" className="log google">log in with google</button>
                                    <button type="button" className="log github">log in with github</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login; 
