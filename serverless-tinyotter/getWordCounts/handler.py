from __future__ import print_function

import os
import json
import logging
import pymysql
import json
import string

log = logging.getLogger()
log.setLevel(logging.DEBUG)

def get_login_data():
    data = {};
    try:
        data["host"] = os.environ['TO_HOST']
        data["user"] = os.environ['TO_USER']
        data["password"] = os.environ['TO_PASSWORD']
        data["database"] = os.environ['TO_DATABASE']
    except:
        log.debug("Unable to load env variables.")
        return data
    else:
        return data

# Retrieve all utterances from all logs in the MySQL database.
def get_all_utterances(loginData):
    utterances = [];
    if (len(utterances) == 0): # Only query the database once per file exec.
        cnx = pymysql.connect(
            host=loginData['host'],
            user=loginData['user'],
            password=loginData['password'],
            db=loginData['database'],
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        );
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
    rows = get_all_utterances(get_login_data());
    words = {};
    for row in rows:
        splits = row.split();
        for word in splits:
            cleaned = clean_word(word);
            if (cleaned in words):
                words[cleaned] += 1;
            else:
                words[cleaned] = 1;
    # Sort the dict of words into an array (largest first)
    sorted_words = sorted(words.items(), key=lambda item: -item[1]);

    return sorted_words;

# Force word to lowercase and strip any punctuation characters from both ends
def clean_word(word):
    return word.lower().strip(string.punctuation);

# this is a stub
def getWordCounts():
    return get_words_by_count();

def handler(event, context):
    log.debug("Received event {}".format(json.dumps(event)))
    wordCounts = getWordCounts();
    return {
        'word_counts': wordCounts,
    };
