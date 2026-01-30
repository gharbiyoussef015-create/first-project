import { useState, useEffect } from 'react';

function Login(){
 
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
 
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
 
    if (isLoggedIn) {
        function addTask() {
            const taskId = Date.now(); // Simple unique ID
            setTasks(prev => [...prev, {
                id: taskId,
                text: '',
                description: '',
                date: '',
                priority: '',
                category: '',
                status: ''
            }]);
        }

        function clearAllTasks() {
            setTasks([]);
        }
 
        function toggleDarkMode() {
            setDarkmode(prev => !prev);
        }

        function updateTask(taskId, field, value) {
            setTasks(prev => prev.map(task =>
                task.id === taskId ? { ...task, [field]: value } : task
            ));
        }

        const filteredTasks = tasks
            .filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortBy === 'priority') {
                    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1, '': 0 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                }
                if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
                if (sortBy === 'categorie') return a.category.localeCompare(b.category);
                if (sortBy === 'status') return a.status.localeCompare(b.status);
                return 0;
            });

        return (
            <div style={{ backgroundColor: darkmode ? "#f8fafc" : "#222222" }} className="dashboard">
                <button className="mode-btn" onClick={toggleDarkMode}>{darkmode? "Dark":"Light"} mode</button>
                <h1 style={{ color: darkmode ? "#222222" : "#f8fafc" }}>📋 Task Manager Dashboard</h1>

                <div className="user-info">
                    <p>Logged in as: <strong>{email}</strong></p>
                    <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
                        Logout
                    </button>
                </div>

                <div className="tasks-preview">
                    <div className='filter'>
                        <input
                            type="text"
                            placeholder='search...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <label htmlFor="">sort by:
                        <select
                            name="priority"
                            id="priority"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="" disabled>Sort by</option>
                            <option value="status">Status</option>
                            <option value="categorie">Categorie</option>
                            <option value="priority">Priority</option>
                            <option value="date">Date</option>
                        </select>
                        </label>
                    </div>
                    <button onClick={addTask}>new task</button>
                    <button onClick={clearAllTasks}>delete all tasks</button>
                    <div>
                        {filteredTasks.map(task => (
                            <div className="task-item" key={task.id}>
                                <input
                                    type="text"
                                    placeholder="title"
                                    value={task.text}
                                    onChange={(e) => updateTask(task.id, 'text', e.target.value)}
                                />
                                <button onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}>×</button> 
                                    <div>
                                 <textarea
                                    rows="3"
                                    cols="23"
                                    placeholder='description...'
                                    value={task.description}
                                    onChange={(e) => updateTask(task.id, 'description', e.target.value)}
                                 ></textarea>
                                    </div>
                                 <div className='listes'>
                                    <label htmlFor="">date limite:
                                        <input
                                            type="date"
                                            value={task.date}
                                            onChange={(e) => updateTask(task.id, 'date', e.target.value)}
                                        />
                                    </label>
                                    <label htmlFor="">priority:
                                    <select
                                        name="priority"
                                        value={task.priority}
                                        onChange={(e) => updateTask(task.id, 'priority', e.target.value)}
                                    >
                                        <option value="" disabled>Priorités</option>
                                        <option value="low">Low Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="high">High Priority</option>
                                    </select>
                                    </label>
 
                                    <label htmlFor="">categorie:
                                    <select
                                        name="categorie"
                                        value={task.category}
                                        onChange={(e) => updateTask(task.id, 'category', e.target.value)}
                                    >
                                        <option value="" disabled>Catégories</option>
                                        <option value="Personnel">Personnel</option>
                                        <option value="Travail">Travail</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                    </label>
                                    <label htmlFor="">status:
                                    <select
                                        name="status"
                                        value={task.status}
                                        onChange={(e) => updateTask(task.id, 'status', e.target.value)}
                                    >
                                        <option value="" disabled>Status</option>
                                        <option value="a faire">a faire</option>
                                        <option value="en cours">en cours</option>
                                        <option value="termine">termine</option>
                                        <option value="annulee">annulee</option>
                                    </select>
                                    </label>
                                 </div>
                            </div>
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