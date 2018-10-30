package fi.oph.yki;

import fi.oph.yki.model.LogEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class YkiLogController {

    private static final Logger logger = LoggerFactory.getLogger(YkiLogController.class);

    private static int LOG_MSG_LIMIT = 10240;

    @PostMapping(value=  "/log")
    public ResponseEntity<String> log(@RequestBody LogEntry logEntry) {
        if (logEntry.getMessage().length() < LOG_MSG_LIMIT) {
            logger.error("Error in frontend application: {}", logEntry.getMessage());
        }
        return new ResponseEntity<>("{\"success\":true}", HttpStatus.OK);
    }
}