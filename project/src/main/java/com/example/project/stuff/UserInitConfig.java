package com.example.project.stuff;


import com.example.project.entity.User;
import com.example.project.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
@Configuration
@RequiredArgsConstructor
public class UserInitConfig {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @PostConstruct
    public void initCurrencies() {
        if(userRepository.count()==0){
            User user = User.builder()
                    .name("kostya kovalenko")
                    .email("kostyakovalenko@gmail.com")
                    .password(passwordEncoder.encode("12345678"))
                    .admin(true)
                    .build();
userRepository.save(user);
        }
    }
}
