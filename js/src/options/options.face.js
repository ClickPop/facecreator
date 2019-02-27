var sections = {
  face: {
    label: "Face",
    options: {
      skin: colorOption("Skin Tone", 7),
      face: standardOption("Face", 4, true, "skin"),
      mouth: standardOption("Mouth", 8),
      nose: standardOption("Nose", 8),
      eyes: standardOption("Eyes", 8)
    }
  },
  hair: {
    label: "Hair",
    options: {
      hairColor: colorOption("Hair Color", 9),
      hair: toggleOptionHiddenBy("Hair", 9, "headcoverings", true, "hairColor"),
      beard: toggleOption("Facial Hair", 3, true, "hairColor"),
      brows: standardOption("Eyebrows", 4, true, "hairColor")
    }
  },
  attire: {
    label: "Attire",
    options: {
      glasses: toggleOption("Glasses", 3, true, "glassesColor"),
      glassesColor: colorOption("Glasses Color", 5),
      piercings: toggleOption("Piercings", 8),
      headcoverings: toggleOption("Head Coverings", 3, true, "headcoveringsColor"),
      headcoveringsColor: colorOption("Head Covering Color", 5)
    }
  },
  decoration: {
    label: "Decoration",
    options: {
      bg: standardOption("Background", 9)
    }
  }
};
var hiddenOptions = {
  ear: hiddenOption("skin")
};
