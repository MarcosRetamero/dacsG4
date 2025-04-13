package utn.dacs.ms.conector.dto;

public class ExerciseWithImageDTO {

    private ExerciseDTO exercise;
    private ExerciseImageDTO image;

    public ExerciseDTO getExercise() {
        return exercise;
    }

    public void setExercise(ExerciseDTO exercise) {
        this.exercise = exercise;
    }

    public ExerciseImageDTO getImage() {
        return image;
    }

    public void setImage(ExerciseImageDTO image) {
        this.image = image;
    }
}
