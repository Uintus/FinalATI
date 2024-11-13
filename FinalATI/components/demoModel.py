from Model import *
model = trainning_model()
identifier_img, answers_img = processing_img('static/img/answersheet.png')
handWritten_recog(model, answers_img, identifier_img)