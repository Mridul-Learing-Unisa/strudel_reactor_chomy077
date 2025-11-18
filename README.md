# Strudel Music Web App

## 1. Overview
This project is a Strudel-based music web application built with React.  
The user can play music, change controls, visualise gain values, and save/load settings.  
All Strudel code used in this project was written **by me**.

---

## 2. Controls

### **Play / Stop**
- **Play** → Starts the music by running the preprocessed Strudel code.
- **Stop** → Stops all audio.

---

### **Volume Slider**
- Adjusts how loud the audio output is.

### **CPM**
- CPM = cycles per minute.
- Controls the tempo (speed) of the music.

---

### **Track Toggles**
The user can turn on/off these musical layers:
- Drum  
- Bassline  
- Melody  
- Groove  

Turning a track off removes it from the song.

---

### **Hotkeys**
For quick control:
- **1** → Toggle Drum  
- **2** → Toggle Bassline  
- **3** → Toggle Melody  
- **4** → Toggle Groove  

---

## 3. Gain Visualiser (Graph)
- A live D3 line graph showing the gain values that Strudel logs.
- Low values show as **blue** and high values as **purple**.
- The graph updates in real time while the song is playing.
- There is a **Clear Graph** button to reset it manually.

---

## 4. Save / Load / Reset Settings

### **Save**
- Saves the user settings as `settings.json`.
- Stored values:
  - volume  
  - cpm  
  - track toggles  

### **Load**
- Loads a previously saved `settings.json`.
- Applies the saved settings instantly.

### **Reset**
- Resets controls back to defaults:
  - volume: 1  
  - cpm: 30  
  - drum/bassline/melody/groove: all ON  
- Does not change the JSON file unless Save is pressed.

---

## 5. Demonstration Video
`https://drive.google.com/file/d/17H18rd94REvvH00AgX14szge7B70rPm8/view?usp=sharing`
I wore sunglasses and had rbg backround to make it look cool

---

## 6. Bonus Features
- Custom D3 gradient gain graph  
- Track toggle hotkeys  
- Save/Load JSON settings  
- Automatic preprocessing system  

---

## 7. Song Code Source
- **All music and Strudel code used in this project was written entirely by me.**  
- No bakery templates or external tunes were used.

