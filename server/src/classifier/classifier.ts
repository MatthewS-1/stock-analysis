import * as natural from 'natural'
import {adjectives, verbs, nouns} from './vocab'

interface article {
    source: JSON
    author: string
    title: string
    url: string
    urlToImage: string
    publishedAt: string
    conent: string
}

function loadClassifier() {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        natural.BayesClassifier.load('./src/classifier/bayesClassifier.json', null, function (error, loadedClassifier) {
            if (error) {
                return reject(error)
            }
            return resolve(loadedClassifier)
        });
    })
}

var classifier: natural.BayesClassifier
loadClassifier().then((loadedClassifier) => {
    classifier = loadedClassifier as natural.BayesClassifier
})

const useful = (word: string) => (adjectives.has(word) || verbs.has(word) || nouns.has(word))

const tokenizer = new natural.WordTokenizer();

const preprocess = (text: string) => {
  const tokenized = tokenizer.tokenize(text).map(word => natural.PorterStemmer.stem(word))
  return tokenized.filter(word => useful(word)).join(' ')
}

async function classify(articles: article[]){
    if (!articles.length){
        return 0
    }
    const sentimentToInt = (sentiment: string) => ['negative', 'neutral', 'positive'].indexOf(sentiment) - 1
    
    const sentiments = articles.map(article => classifier.classify(preprocess(article.title)))
    const sentimentsAsInt = sentiments.map(sentiment => sentimentToInt(sentiment))
    const sentimentSum = sentimentsAsInt.reduce((sum, curr) => sum + curr, 0)
    const overallSentiment = Math.tanh(sentimentSum/10)
    //console.log(sentiments, sentimentSum, overallSentiment)
    return overallSentiment
}

export {classify}