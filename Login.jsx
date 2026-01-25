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

            //DASHBOARD
            const [newTask, setNewTask] = useState([]); 
            const thing=newTask.map(thing => <p key={thing}> {thing} </p>)
            
        if (isLoggedIn) {
            function add(){
                setNewTask(
                    prev=>[...prev , 
                    <div> 
                        <input key={thing} id='newtask' type="text" placeholder="task"/>
                        <button id='deletetask' onclick={reset}>+</button> 
                    </div>])
            }

            function reset(){
                setNewTask([])
            }
            function switche(){
                setDarkmode(prev=>!prev)}

            return (
                
            <div style={{ backgroundColor: darkmode ?  "#f8fafc":"#222222" }} className="dashboard" > 
            <button className="mode-btn" onClick={switche}>change mode</button>
                <h1 style={{ color: darkmode ?  "#222222" : "#f8fafc" }}>📋 Task Manager Dashboard</h1> 


                <div className="user-info" >
                <p>Logged in as: <strong>{email}</strong></p>
                
                <button onClick={() => setIsLoggedIn(false)}  className="logout-btn">
                    Logout 
                </button>
                </div>


                <div className="tasks-preview">
                    <button onClick={add} >new task</button>
                    <button onClick={reset} >delete all tasks</button>
                    <h2>{thing}</h2>
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