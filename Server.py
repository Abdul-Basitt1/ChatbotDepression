
from flask import Flask, request, jsonify
import joblib
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import requests
import subprocess
from hugchat import hugchat
app = Flask(__name__)

# Load the pre-trained models
classifier = joblib.load('./classifierLarge.pkl')
vectorizer = joblib.load('./vectorizerLarge.pkl')
chatbot = hugchat.ChatBot(cookie_path="./intents.json")
# Initialize VADER sentiment analyzer
vader_analyzer = SentimentIntensityAnalyzer()

# Global variables to keep track of conversation state
conversation_history = []
depression_test_asked = False
depression_statement_count = 0


depression_test_questions = [
    "1. Feeling down, depressed, or hopeless.",
    "2. Little interest or pleasure in doing things.",
    "3. Trouble falling or staying asleep, or sleeping too much.",
    "4. Feeling tired or having little energy.",
    "5. Poor appetite or overeating.",
    "6. Feeling bad about yourself or that you are a failure or have let yourself or your family down.",
    "7. Trouble concentrating on things, such as reading the newspaper or watching television.",
    "8. Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual.",
    "9. Thoughts that you would be better off dead, or of hurting yourself."
]

songs = [
    "1) “We Can Fly” by Rue du Soleil (https://www.youtube.com/watch?v=rbzuesSeDmQ)",
    "2) “Canzonetta Sull’aria” by Mozart (https://www.youtube.com/watch?v=Fc3fmSSUwck ) ",
    "3) “Someone Like You” by Adele (https://www.youtube.com/watch?v=NAc83CF8Ejk ) ",
    "4) “Pure Shores” by All Saints (https://www.youtube.com/watch?v=dVNdTXEJv1A ) ",
    "5) “Please Don’t Go” by Barcelona (https://www.youtube.com/watch?v=COqx-TCxrSk ) ",
    "6) “Strawberry Swing” by Coldplay (https://www.youtube.com/watch?v=isH1yy8I_dc ) ",
    "7) “Watermark” by Enya (https://www.youtube.com/watch?v=NO5tb20qQnA ) ",
    "8) “Mellomaniac (Chill Out Mix)” by DJ Shah (https://www.youtube.com/watch?v=EcRXlM6edrM)",
    "9) “Electra” by Airstream (https://www.youtube.com/watch?v=FTvZ8a2gHFc)",
    "10) “Weightless” by Marconi Union (https://www.youtube.com/watch?v=UfcAVejslrU)"
]

games = [
    {"name": "Word City Uncrossed", "link": "https://poki.com/en/g/word-city-uncrossed#fullscreen"},
    {"name": "Subway Surfers", "link": "https://poki.com/en/g/subway-surfers#fullscreen"},
    {"name": "Brain Test: Tricky Puzzles", "link": "https://poki.com/en/g/brain-test-tricky-puzzles#fullscreen"},
    {"name": "Infinity Loop", "link": "https://poki.com/en/g/infinity-loop#fullscreen"},
    {"name": "Energy", "link": "https://poki.com/en/g/energy#fullscreen"}
]

# @app.route('/reload-server', methods=['GET'])
# def reload_server():
#     subprocess.Popen("python Server.py", shell=True)
#     return jsonify({"message": "Server reloaded successfully!"})

# Function to classify inputs collectively with enhanced sentiment analysis
def classify_inputs(inputs):
    vectorized_inputs = vectorizer.transform(inputs)
    predictions = classifier.predict(vectorized_inputs)
    sentiments = [vader_analyzer.polarity_scores(text)['compound'] for text in inputs]

    combined_score = 0
    for sentiment, prediction in zip(sentiments, predictions):
        if prediction == 'suicide':
            combined_score += 0.5
        if sentiment < -0.1:
            combined_score += 0.5

    if combined_score >= 1.5:
        return True
    else:
        return False

def conduct_depression_test(answers):
    total_score = sum(map(int, answers))
    return total_score

def get_depression_category(score):
    if score >= 1 and score <= 4:
        return "Minimal"
    elif score >= 5 and score <= 9:
        return "Mild"
    elif score >= 10 and score <= 14:
        return "Moderate"
    elif score >= 15 and score <= 19:
        return "Moderately Severe"
    else:
        return "Severe"

def generate_response1(user_input):
    try:
        response = ""
        chatbot = hugchat.ChatBot(cookie_path="./intents.json")
        response += chatbot.chat(user_input)
        words = response.split()
        num_words = len(words)
        if num_words > 50:
            response = chatbot.chat("Please create 3 line of response ")
    except (requests.exceptions.ConnectionError) as e:
        print("Error:", e)
        response = "I'm sorry, I couldn't connect to the internet or there was an issue with the bot. Please try again later."
    return {"response": f"{response}"}

depression_score_history=[]


@app.route('/chat', methods=['POST'])
def chat():
    global conversation_history, depression_test_asked, depression_statement_count, awaiting_yes_no_response, depression_score_history
    data = request.json
    user_input = data['user_input']
    
    if user_input.lower() == 'end':
        return jsonify({"response": "Goodbye!"})
    
    if not depression_test_asked:
        conversation_history.append(user_input)
    
    depression_detected = classify_inputs(conversation_history)
    
    if depression_detected and not depression_test_asked:
        depression_statement_count += 1
        if depression_statement_count == 2:
            response = "It sounds like you're going through a tough time. Would you like to take a depression test to assess your feelings? Reply 'yes' or 'no'"
            depression_test_asked = True
            awaiting_yes_no_response = True
        else:
            response = generate_response1(user_input)['response']
        return jsonify({"response": response})
    
    if depression_test_asked:
        if awaiting_yes_no_response:
            if user_input.lower() in ['yes', 'no']:
                awaiting_yes_no_response = False
                if user_input.lower() == 'yes':
                    response = "Choose number between 0 - 3\n0 - Not at all\n1 - Several days\n2 - More than half the days\n3 - Nearly every day"
                    response += "\n\n\n" + depression_test_questions[0]
                else:
                    depression_statement_count = 0
                    depression_test_asked = False
                    depression_score_history = []
                    conversation_history = []
                    response = "Okay, if you need help or feel like talking, I'm here for you."
            else:
                response = "Please respond with 'yes' or 'no'."
        else:
            if user_input.isdigit() and 0 <= int(user_input) <= 3:
                depression_score_history.append(int(user_input))
                if len(depression_score_history) < len(depression_test_questions):
                    response = depression_test_questions[len(depression_score_history)]
                else:
                    depression_test_asked = False
                    depression_score = conduct_depression_test(depression_score_history)
                    result = get_depression_category(depression_score)
                    recommendations = get_recommendations(result)
                    response = f"Your depression level is {result}. Here are some recommendations:\n" + '\n'.join(recommendations)
            else:
                response = "Please respond with a numeric value between 0 and 3."
        
        return jsonify({"response": response})
    
    response_data = generate_response1(user_input)
    response = response_data['response']

    return jsonify({"response": response})

def get_recommendations(category):
    if category == "Minimal":
        return [
            "Engage in regular physical activity, such as walking or jogging.",
            "Practice relaxation techniques like deep breathing or meditation.",
            "Maintain a balanced diet and get enough sleep.",
            "Stay socially connected with friends and family."
        ]
    elif category == "Mild":
        return [
            "Seek support from a therapist or counselor.",
            "Address mild symptoms early to prevent them from worsening."
        ]
    elif category == "Moderate":
        return [
            "Listen to music for relaxation. Here are some suggestions:",
            *songs
        ]
    elif category == "Moderately Severe":
        return [
            "Play some games for relaxation. Here are some suggestions:",
            *["{}: {}".format(game['name'], game['link']) for game in games]
        ]
    else:
        return [
            "Seek professional help immediately.",
            "Contact a mental health professional or therapist for support and guidance.",
            "Reach out to a trusted friend or family member for assistance and companionship.",
            "Call emergency services (0311-7786264) Umang Pakistan, for immediate assistance."
        ]

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
