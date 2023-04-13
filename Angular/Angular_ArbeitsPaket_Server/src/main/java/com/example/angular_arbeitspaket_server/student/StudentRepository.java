package com.example.angular_arbeitspaket_server.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long>
{
    public List<Student> findStudentByLastName(String lastName);
    public List<Student> findStudentByFirstName(String firstName);
    public List<Student> findStudentBySubject(String subject);
    public List<Student> findStudentByEmail(String email);
    @Query(value = "SELECT SUBJECT, count(*) as num_students from student GROUP BY SUBJECT;" ,nativeQuery = true)
    public List<String> getNumberOfStudentsPerSubject();
}
