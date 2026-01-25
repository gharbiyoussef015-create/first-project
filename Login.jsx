import { useState } from 'react'; 

function Login(){ 
    
   
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [error,setError] = useState('');
    const demoAccounts = [
    { email: "admin@admin.com", password: "1234" },
    { email: "user@test.com", password: "test123" }
  ];
    const [darkmode , setDarkmode]=useState(false)

    const submit = (formData) => {
        const email=formData.get("email")
        setEmail(email)
        const password=formData.get("password")
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

    // DASHBOARD
    const [tasks, setTasks] = useState([]);
    
    if (isLoggedIn) {
        function addTask() {
            const taskId = Date.now(); // Simple unique ID
            setTasks(prev => [...prev, { id: taskId, text: '' }]);
        }

        function clearAllTasks() {
            setTasks([]);
        }
        
        function toggleDarkMode() {
            setDarkmode(prev => !prev);
        }

        return (
            <div style={{ backgroundColor: darkmode ? "#f8fafc" : "#222222" }} className="dashboard">
                <button className="mode-btn" onClick={toggleDarkMode}>change mode</button>
                <h1 style={{ color: darkmode ? "#222222" : "#f8fafc" }}>📋 Task Manager Dashboard</h1>

                <div className="user-info">
                    <p>Logged in as: <strong>{email}</strong></p>
                    <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
                        Logout
                    </button>
                </div>

                <div className="tasks-preview">
                    <button onClick={addTask}>new task</button>
                    <button onClick={clearAllTasks}>delete all tasks</button>
                    <div>
                        {tasks.map(task => (
                            <div key={task.id}>
                                <input type="text" placeholder="task" />
                                <button onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}>×</button>
                            </div>//remove tasks button...i have no hand in this tbh!
                        ))}
                    </div>
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
                
                <form action={submit} id="form">
                    <div id="informations">
                        <h2>Connexion</h2>
                        <div className="input-group">
                            <label htmlFor="email">Email:
                            
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                placeholder="example@gmail.com"
                                name='email'
                            />
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="pass">Password:
                            
                            <input 
                                type="password"  
                                id="pass" 
                                required 
                                placeholder="password"
                                name='password'
                            />
                            </label>
                            
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