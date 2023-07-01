from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io

app = Flask(__name__, template_folder='doctor')
model = load_model("./cnn.h5")

class_labels = [
    "Atelectasis", "Brain_Tumor", "Cardiomegaly", "Consolidation", "Edema", "Effusion",
    "Emphysema", "Fibrosis", "Hernia", "Infiltration", "Mass", "No_Brain_Finding",
    "No_Lung_Finding", "Nodule", "Pleural", "Pneumonia", "Pneumothorax", "Tuberculosis"
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/report-submit", methods=["POST"])
def classify():
    image_file = request.files["upfile"]
    img = image.load_img(io.BytesIO(image_file.read()), target_size=(150, 150))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0

    predictions = model.predict(img)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = class_labels[predicted_class_index]

    return predicted_class

if __name__ == "__main__":
    app.run(debug=True)