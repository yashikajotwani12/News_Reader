import React,{useState,useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import wordsToNumbers from 'words-to-numbers'
import NewsCards from './components/NewsCards/NewsCards';


import useStyles from './styles.js'

const alanKey ='7f4f4c6fcccc38eebd7add9fd085c5a62e956eca572e1d8b807a3e2338fdd0dc/stage'
const App=()=>{
    const[newsArticles, setNewsArticles]=useState([]);
    const [activeArticle , setActiveArticle]= useState(-1);
    const [isOpen , setIsOpen] =useState(false);
    const classes=useStyles();

    useEffect(()=>{
        
        alanBtn({
            key: alanKey,
            onCommand:({command,articles, number})=>{
                if(command === 'newHeadlines'){
                   setNewsArticles(articles);
                   setActiveArticle(-1);
                }else if( command === 'instructions') {
                    setIsOpen(true);
                }
                
                 else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle + 1);
                } else if(command==='open'){
                    const parseNumber=number.length > 2 ? wordsToNumbers(number, {fuzzy:true}):number;
                    window.open(articles[parseNumber-1].url,'_blank');
                  }
            }
        })
    },[])
    return(
        <div>
        <div className={classes.logoContainer}>
            <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo"/>
        </div>
        <NewsCards articles = {newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}
export default App;