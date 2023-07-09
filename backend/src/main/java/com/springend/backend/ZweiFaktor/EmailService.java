package com.springend.backend.ZweiFaktor;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void codeVerschicken(String email, String code) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("your-email@example.com");
        helper.setTo(email);
        helper.setSubject("Ihr Verifizierungscode");
        helper.setText("Ihr Verifizierungscode lautet: " + code);

        mailSender.send(message);
    }

    public void freundschaftsanfrageVerschicken(String email) throws MessagingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("your-email@example.com");
        helper.setTo(email);
        helper.setSubject("Neue Freundschaftsanfrage");
        helper.setText("Sie haben eine Freundschaftsanfrage erhalten");

        mailSender.send(message);
    }

    public void diskussionNeuerComment(String email) throws MessagingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("your-email@example.com");
        helper.setTo(email);
        helper.setSubject("Neuer Kommentar");
        helper.setText("Es gibt eine Änderung in einem von Ihnen favorisiertem Diskussionsthema");

        mailSender.send(message);
    }
    public void deletedComment(String email) throws MessagingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("your-email@example.com");
        helper.setTo(email);
        helper.setSubject("Änderung im Diskussionforum");
        helper.setText("Ein Kommentar wurde in einem von Ihnen favorisiertem Diskussionsthema gelöscht");

        mailSender.send(message);
    }

    public void deletedPost(String email) throws MessagingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("your-email@example.com");
        helper.setTo(email);
        helper.setSubject("Änderung im Diskussionforum");
        helper.setText("Das Diskussionthema wurde gelöscht");

        mailSender.send(message);
    }

}

