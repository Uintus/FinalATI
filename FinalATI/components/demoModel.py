from Model import *
model = training_model()
identifier_img, answers_img = processing_img('components/answersheet.png')
result_identifiers, result_answers = handwritten_recog(model, answers_img, identifier_img)
print(result_identifiers, result_answers)