package org.student.api.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class CollegeController {

    @GetMapping("/operation_code")
    public String getOperationCode() {
        return "OP_CODE_123";
    }

    @PostMapping("/process_data")
    public Map<String, Object> processData(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> response = new HashMap<>();
        
        // Extract data from the request
        String userId = (String) requestData.get("userId");
        String collegeEmail = (String) requestData.get("collegeEmail");
        String collegeRollNumber = (String) requestData.get("collegeRollNumber");
        List<Integer> numberArray = (List<Integer>) requestData.get("numberArray");
        List<String> alphabetArray = (List<String>) requestData.get("alphabetArray");
        
        // Logic to find the highest lowercase alphabet
        Optional<String> highestAlphabet = alphabetArray.stream()
                .filter(ch -> ch.matches("[a-z]"))
                .max(Comparator.naturalOrder());
        
        // Build the response
        response.put("status", "success");
        response.put("userId", userId);
        response.put("collegeEmail", collegeEmail);
        response.put("collegeRollNumber", collegeRollNumber);
        response.put("numberArray", numberArray);
        response.put("alphabetArray", alphabetArray);
        response.put("highestLowercaseAlphabet", highestAlphabet.orElse("No lowercase letter found"));

        return response;
    }
}
