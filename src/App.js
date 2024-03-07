import logo from './logo.svg';
import './App.css';
import Game from "./Game";

function App() {
    const styles={
        title:{fontSize: 60},
        logo:{fontSize:15}
    }
    return (
        <div className="App">
            <div id={""}>
                <h1 style={styles.title}>Connect Four</h1>
                <Game />
                <br/>
                <div style={styles.logo}>Connect 4 | AYRD</div>

            </div>

        </div>
    );
}

export default App;
