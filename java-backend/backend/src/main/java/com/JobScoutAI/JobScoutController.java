package com.JobScoutAI;

import com.JobScoutAI.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class JobScoutController {
    @Autowired
    private StorageService storageService;

    @GetMapping({"/","home"})
    public String home(){
        return "forward:/index.html";
    }

    @PostMapping
    public String uploadFile(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes, Model model) {
        //storageService.store(file);
        redirectAttributes.addFlashAttribute("message", "File: "+file.getOriginalFilename() + " uploaded successfully");
        return "redirect:/home";
    }
}
