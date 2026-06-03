package com.flavorcast;
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.ai.chat.client.ChatClient;
import java.util.List;
import java.util.Map;

// 1. Entity
@Entity
public class Ingredient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

// 2. Repository
interface IngredientRepository extends JpaRepository<Ingredient, Long> {}

// 3. Controller & AI Service
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows React to call this API
class AppController {
    
    private final IngredientRepository repo;
    private final ChatClient chatClient;

    // Spring AI auto-configures the ChatClient.Builder for us
    public AppController(IngredientRepository repo, ChatClient.Builder builder) {
         this.repo = repo;
         this.chatClient = builder.build();
    }

    @GetMapping("/ingredients")
    public List<Ingredient> getIngredients() { 
        return repo.findAll(); 
    }

    @PostMapping("/ingredients")
    public Ingredient add(@RequestBody Ingredient ing) { 
        return repo.save(ing); 
    }

    @DeleteMapping("/ingredients/{id}")
    public void delete(@PathVariable Long id) { 
        repo.deleteById(id); 
    }

    @GetMapping("/recipe")
    public Map<String, String> generateRecipe() {
         List<String> items = repo.findAll().stream().map(Ingredient::getName).toList();
         if(items.isEmpty()) {
             return Map.of("recipe", "Add some ingredients to your pantry first!");
         }
         
         // System prompt directing the AI's culinary logic
         String prompt = "I have the following ingredients in my kitchen: " + String.join(", ", items) + 
                         ". Please generate a creative, step-by-step recipe using some or all of these. " +
                         "If you see seafood and spices, a Kerala-style preparation would be amazing. " +
                         "If you see pasta, leaning towards a rich fusion dish would be great. Format the response cleanly.";
                         
         String response = chatClient.prompt()
                                     .user(prompt)
                                     .call()
                                     .content();
                                     
         return Map.of("recipe", response);
    }
}