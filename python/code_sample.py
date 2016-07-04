import pymysql
import json
import string
from difflib import SequenceMatcher

from mysql.connector import errorcode

# Stores a local copy of the utterances to avoid extraneous database calls.
utterances = []
default_login_data = {
    'user': 'FILL_ME_IN',
    'password': 'FILL_ME_IN',
    'database': 'FILL_ME_IN',
    'host': 'FILL_ME_IN',
}

# ------------------------------------------------------------------------------

def report_utterance_word_counts(filepath):
    """
    Write text file that reports word counts for utterances in the demo database.
    :param filepath: output file path.
    """

    words = get_words_by_count()
    with open(filepath, 'w') as f:
        for word in words:
            f.write(str(word[0]) + ": " + str(word[1]) + '\n')

    # Fetch all of the log data from the database.
    # Ignore log_data rows that are not of type 'speech'.
    # Compute a total count (across all logs) for each unique word found in the data.
    # Write the count for each word to a text file.

    print "Sorted (decreasing) word counts written to: " + filepath

# ------------------------------------------------------------------------------

# ------------------------------------------------------------------------------

def find_most_similar_utterance(utterance_to_match):
    """
    Write text file that reports word counts for utterances in the demo database.
    :param utterance_to_match: arbitrary string of words
    :returns most similar utterance from the database
    """
    utterances = get_all_utterances(get_all_utterances)
    best_similarity = -1
    best_phrase = ""

    for phrase in utterances:
        sim = get_similarity(phrase, utterance_to_match)
        if (sim >= best_similarity):
            best_phrase = phrase
            best_similarity = sim

    return best_phrase
    # Fetch all of the log data from the database.
    # Ignore log_data rows that are not of type 'speech'.
    # Find and return the utterance that is the closest match to the input.
    # Matching should be case-insensitive.

# ------------------------------------------------------------------------------

def get_similarity(phraseA, phraseB):
    """
    Determine the similarity of two phrases.

    Might be better to use a more sophisticated string difference algorithm
    such as levenshtein or OSA, but this works well enough for now and does not
    require any external libraries to be installed.
    """
    return SequenceMatcher(None, phraseA, phraseB).ratio()

# Retrieve all utterances from all logs in the MySQL database.
def get_all_utterances(loginData):
    if (len(utterances) == 0): # Only query the database once per file exec.
        cnx = pymysql.connect(
            host=loginData['host'],
            user=loginData['user'],
            password=loginData['password'],
            db=loginData['database'],
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        try:
            with cnx.cursor() as cursor:
                query = 'SELECT logs.id as "ID", log_data.data as "DATA" FROM logs LEFT JOIN log_data ON logs.id = log_data.log_id'
                cursor.execute(query)
                result = cursor.fetchall()
                for id in result:
                    data = id['DATA']
                    if (data != '#INVALID#'):
                        jsonData = json.loads(data)
                        obsType = jsonData['obs']['type']
                        if (obsType == "speech"):
                            utterances.append(jsonData['obs']['utterance'])
        finally:
            cnx.close()
        return utterances
    else:
        return utterances

# Return all words in utterances in the database as an array of tuples
# [(word, count)...]
def get_words_by_count():
    rows = get_all_utterances(default_login_data)
    words = {}
    for row in rows:
        splits = row.split()
        for word in splits:
            cleaned = clean_word(word)
            if (cleaned in words):
                words[cleaned] += 1
            else:
                words[cleaned] = 1
    # Sort the dict of words into an array (largest first)
    sorted_words = sorted(words.items(), key=lambda item: -item[1])

    return sorted_words

# Force word to lowercase and strip any punctuation characters from both ends
def clean_word(word):
    return word.lower().strip(string.punctuation)

if __name__ == '__main__':

    if (default_login_data['user'] == "FILL_ME_IN"):
        print("Please open the file and provide database login information.");
    else:
        # Write file with counts of words in utterances.
        report_utterance_word_counts('output.txt')

        # Find the most similar utterance in the database to these inputs.
        print find_most_similar_utterance("Please sit wherever you like")
        print find_most_similar_utterance("Can I get Salad and a Beer please")
        print find_most_similar_utterance("Do you want anything else?")
        print find_most_similar_utterance("I'm ready to pay. I'm finished")


# ------------------------------------------------------------------------------
