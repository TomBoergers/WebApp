package com.example.angular_arbeitspaket_server;

import com.example.angular_arbeitspaket_server.student.Student;
import com.example.angular_arbeitspaket_server.student.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AngularArbeitsPaketServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(AngularArbeitsPaketServerApplication.class, args);
    }

    //Beispiel Daten werden in Datenbank gespeichert.
    @Bean
    CommandLineRunner init(StudentRepository studentRepository)
    {
        return args ->
        {
          studentRepository.save(new Student("Gandalf","The White","Magie","gandalf@lotr.com"));
          studentRepository.save(new Student("Frodo","Beutlin","Nichts","Frodo.Beutlin@lotr.com"));
          studentRepository.save(new Student("Aragorn","Elessar","Schwertkunst","aragorn@lotr.com"));
          studentRepository.save(new Student("Samwise","Gamgee","Botanik","sam@lotr.com"));
          studentRepository.save(new Student("Bilbo","Beutlin","Literatur","bilbo@lotr.com"));
          studentRepository.save(new Student("Daenerys","Targaryen","Politik","daeny@got.com"));
          studentRepository.save(new Student("Jon","Snow","Nichts","jon@lotr.com"));
          studentRepository.save(new Student("Samwell","Tarly","Literatur","sam@got.com"));
          studentRepository.save(new Student("Tyrion","Lannister","Politik","tyrion@got.com"));
          studentRepository.save(new Student("Albus","Dumbledore","Magie","albus@hp.uk"));
          studentRepository.save(new Student("Jaime","Lennister","Schwertkunst","jaime@got.de"));
          studentRepository.save(new Student("Tywin","Lannister","Politik","tw@got.com"));
          studentRepository.save(new Student("Hermine","Granger","Magie","hermine.gryffindor@hp.uk"));
          studentRepository.save(new Student("Geralt","of Rivia","Schwertkunst","geralt@witcher.com"));
          studentRepository.save(new Student("Yennefer","of Vengerberg","Magie","yenn@witcher.com"));
          studentRepository.save(new Student("Triss","Merigold","Magie","triss@witcher.com"));
        };
    }

}
