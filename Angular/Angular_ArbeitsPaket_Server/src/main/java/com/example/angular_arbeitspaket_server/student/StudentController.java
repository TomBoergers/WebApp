package com.example.angular_arbeitspaket_server.student;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController
{
    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getStudents()
    {
        return new ResponseEntity<>(studentRepository.findAll(),HttpStatus.OK);
    }

    @PostMapping("/students")
    public ResponseEntity addStudent(@RequestBody Student student)
    {
        if(isEmailValid(student.getEmail()))
        {
            if(!isEmailAlreadyInUse(student.getEmail()))
            {
                studentRepository.save(student);
                return new ResponseEntity(HttpStatus.OK);
            }
            return new ResponseEntity("Email alread in use",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Email not valid",HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping(path = "students/{studentID}")
    public void deleteStudent(@PathVariable("studentID")long id)
    {
        studentRepository.deleteById(id);
    }

    @GetMapping(path = "students/lastname/{studentLastName}")
    public ResponseEntity<List<Student>> getStudentsByLastName(@PathVariable("studentLastName")String lastname) {return new ResponseEntity<>(studentRepository.findStudentByLastName(lastname),HttpStatus.OK);}

    @GetMapping(path = "students/firstname/{studentFirstName}")
    public ResponseEntity<List<Student>> getStudentsByFirstName(@PathVariable("studentFirstName")String firstName){return new ResponseEntity<>(studentRepository.findStudentByFirstName(firstName),HttpStatus.OK);}

    @GetMapping(path = "students/subject/{Subject}")
    public ResponseEntity<List<Student>> getStudentsBySubject(@PathVariable("Subject")String Subject){return new ResponseEntity<>(studentRepository.findStudentBySubject(Subject),HttpStatus.OK);}

    @GetMapping(path = "students/email/{StudentEmail}")
    public ResponseEntity<List<Student>> getStudentsByEmail(@PathVariable("StudentEmail")String StudentEmail){return new ResponseEntity<>(studentRepository.findStudentByEmail(StudentEmail),HttpStatus.OK);}

    @GetMapping(path = "students/StudentPerSubject")
    public ResponseEntity<List<Subject>> getStudentsPerSubject(){
        List<Subject> liste = new ArrayList();
        for (String s:studentRepository.getNumberOfStudentsPerSubject())
        {
            String[] subjectArray = s.split(",");
            liste.add(new Subject(subjectArray[0],Integer.valueOf(subjectArray[1])));
        }
        return new ResponseEntity<>(liste,HttpStatus.OK);}

    private boolean isEmailAlreadyInUse(String email)
    {
        List<Student> students = studentRepository.findStudentByEmail(email);
        if(students.size() > 0)
        {
            return true;
        }
        return false;
    }

    private boolean isEmailValid(String email)
    {
        if(email.contains("@") && email.contains("."))
        {
            return true;
        }
        return false;
    }
}
