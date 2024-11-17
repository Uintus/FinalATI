from Model import *
model = trainning_model()
identifier_img, answers_img = processing_img('static/data/AIExam/ans.png')
handWritten_recog(model, answers_img, identifier_img)