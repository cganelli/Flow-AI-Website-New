// EmailJS Test Utility
// Use this to test your EmailJS configuration during development

import { EmailJSService } from './emailjs-service';
import { EMAILJS_CONFIG } from './emailjs-config';

export class EmailJSTestUtility {
  
  /**
   * Test the EmailJS configuration and connectivity
   */
  static async runFullTest(): Promise<{
    success: boolean;
    results: Array<{
      test: string;
      status: 'pass' | 'fail' | 'warning';
      message: string;
    }>;
  }> {
    const results: Array<{
      test: string;
      status: 'pass' | 'fail' | 'warning';
      message: string;
    }> = [];

    // Test 1: Environment Variables
    const envTest = this.testEnvironmentVariables();
    results.push(envTest);

    // Test 2: EmailJS Initialization
    const initTest = this.testInitialization();
    results.push(initTest);

    // Test 3: Configuration Status
    const configTest = this.testConfiguration();
    results.push(configTest);

    // Test 4: Simple Contact Form (if config is valid)
    if (envTest.status === 'pass' && initTest.status === 'pass') {
      const simpleTest = await this.testSimpleContactForm();
      results.push(simpleTest);

      // Test 5: Full Contact Form (if simple test passes)
      if (simpleTest.status === 'pass') {
        const fullTest = await this.testFullContactForm();
        results.push(fullTest);
      }
    }

    const success = results.every(r => r.status === 'pass');
    
    // Log results to console
    console.group('📧 EmailJS Test Results');
    results.forEach(result => {
      const icon = result.status === 'pass' ? '✅' : 
                   result.status === 'warning' ? '⚠️' : '❌';
      console.log(`${icon} ${result.test}: ${result.message}`);
    });
    console.groupEnd();

    return { success, results };
  }

  /**
   * Test environment variables
   */
  private static testEnvironmentVariables(): {
    test: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
  } {
    const required = [
      'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
      'NEXT_PUBLIC_EMAILJS_SIMPLE_TEMPLATE_ID', 
      'NEXT_PUBLIC_EMAILJS_FULL_TEMPLATE_ID',
      'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'
    ];

    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length === 0) {
      return {
        test: 'Environment Variables',
        status: 'pass',
        message: 'All required environment variables are set'
      };
    } else {
      return {
        test: 'Environment Variables',
        status: 'fail',
        message: `Missing variables: ${missing.join(', ')}`
      };
    }
  }

  /**
   * Test EmailJS initialization
   */
  private static testInitialization(): {
    test: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
  } {
    try {
      const success = EmailJSService.init();
      return {
        test: 'EmailJS Initialization',
        status: success ? 'pass' : 'fail',
        message: success ? 'EmailJS initialized successfully' : 'Failed to initialize EmailJS'
      };
    } catch (error) {
      return {
        test: 'EmailJS Initialization',
        status: 'fail',
        message: `Initialization error: ${error}`
      };
    }
  }

  /**
   * Test configuration status
   */
  private static testConfiguration(): {
    test: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
  } {
    const config = EmailJSService.getConfigurationStatus();
    const issues: string[] = [];

    if (!config.hasServiceId) issues.push('Service ID missing');
    if (!config.hasPublicKey) issues.push('Public key missing');
    if (!config.hasSimpleTemplate) issues.push('Simple template ID missing');
    if (!config.hasFullTemplate) issues.push('Full template ID missing');

    if (issues.length === 0) {
      return {
        test: 'Configuration Validation',
        status: 'pass',
        message: `Configuration valid. Emails will be sent to: ${config.recipientEmail}`
      };
    } else {
      return {
        test: 'Configuration Validation',
        status: 'fail',
        message: `Configuration issues: ${issues.join(', ')}`
      };
    }
  }

  /**
   * Test simple contact form sending
   */
  private static async testSimpleContactForm(): Promise<{
    test: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
  }> {
    try {
      const testData = {
        name: 'EmailJS Test User',
        email: 'test@flowai.com',
        company: 'FlowAI Test Company',
        phone: '+1-555-0123'
      };

      const result = await EmailJSService.sendSimpleContact(testData);
      
      return {
        test: 'Simple Contact Form',
        status: result.success ? 'pass' : 'fail',
        message: result.success 
          ? `Test email sent successfully. Ticket: ${result.ticketNumber}`
          : `Failed to send test email: ${result.message}`
      };
    } catch (error) {
      return {
        test: 'Simple Contact Form',
        status: 'fail',
        message: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * Test full contact form sending
   */
  private static async testFullContactForm(): Promise<{
    test: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
  }> {
    try {
      const testData = {
        name: 'EmailJS Test User',
        email: 'test@flowai.com',
        company: 'FlowAI Test Company',
        phone: '+1-555-0123',
        inquiryType: 'general',
        subject: 'EmailJS Configuration Test',
        message: 'This is a test message to verify the EmailJS configuration is working correctly.'
      };

      const result = await EmailJSService.sendContactForm(testData);
      
      return {
        test: 'Full Contact Form',
        status: result.success ? 'pass' : 'fail',
        message: result.success 
          ? `Test email sent successfully. Ticket: ${result.ticketNumber}`
          : `Failed to send test email: ${result.message}`
      };
    } catch (error) {
      return {
        test: 'Full Contact Form',
        status: 'fail',
        message: `Test failed with error: ${error}`
      };
    }
  }

  /**
   * Quick configuration check (non-destructive)
   */
  static quickCheck(): {
    isReady: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check environment variables
    if (!EMAILJS_CONFIG.SERVICE_ID) {
      issues.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID is not set');
      recommendations.push('Set up an email service in EmailJS dashboard');
    }

    if (!EMAILJS_CONFIG.PUBLIC_KEY) {
      issues.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not set');
      recommendations.push('Get your public key from EmailJS account settings');
    }

    if (!EMAILJS_CONFIG.SIMPLE_TEMPLATE_ID) {
      issues.push('NEXT_PUBLIC_EMAILJS_SIMPLE_TEMPLATE_ID is not set');
      recommendations.push('Create simple contact template in EmailJS');
    }

    if (!EMAILJS_CONFIG.FULL_TEMPLATE_ID) {
      issues.push('NEXT_PUBLIC_EMAILJS_FULL_TEMPLATE_ID is not set');
      recommendations.push('Create full contact template in EmailJS');
    }

    // Check if running in browser
    if (typeof window === 'undefined') {
      issues.push('EmailJS requires browser environment');
      recommendations.push('Run tests in browser or during client-side execution');
    }

    return {
      isReady: issues.length === 0,
      issues,
      recommendations
    };
  }

  /**
   * Generate test report for debugging
   */
  static generateReport(): string {
    const check = this.quickCheck();
    const config = EmailJSService.getConfigurationStatus();

    let report = '# EmailJS Configuration Report\n\n';
    
    report += `## Status: ${check.isReady ? '✅ Ready' : '❌ Not Ready'}\n\n`;
    
    report += '## Configuration\n';
    report += `- Service ID: ${config.hasServiceId ? '✅ Set' : '❌ Missing'}\n`;
    report += `- Public Key: ${config.hasPublicKey ? '✅ Set' : '❌ Missing'}\n`;
    report += `- Simple Template: ${config.hasSimpleTemplate ? '✅ Set' : '❌ Missing'}\n`;
    report += `- Full Template: ${config.hasFullTemplate ? '✅ Set' : '❌ Missing'}\n`;
    report += `- Recipient Email: ${config.recipientEmail}\n`;
    report += `- Initialized: ${config.isInitialized ? '✅ Yes' : '❌ No'}\n\n`;

    if (check.issues.length > 0) {
      report += '## Issues\n';
      check.issues.forEach(issue => {
        report += `- ❌ ${issue}\n`;
      });
      report += '\n';
    }

    if (check.recommendations.length > 0) {
      report += '## Recommendations\n';
      check.recommendations.forEach(rec => {
        report += `- 💡 ${rec}\n`;
      });
      report += '\n';
    }

    report += '## Next Steps\n';
    if (check.isReady) {
      report += '1. Run `EmailJSTestUtility.runFullTest()` to test email sending\n';
      report += '2. Check EmailJS dashboard for sent emails\n';
      report += '3. Verify emails are received at carissa@thisisflowai.com\n';
    } else {
      report += '1. Fix the issues listed above\n';
      report += '2. Follow the recommendations\n';
      report += '3. Re-run this report\n';
    }

    return report;
  }
}

// Development helper - automatically log status when imported
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('📧 EmailJS Test Utility loaded');
  console.log('Run EmailJSTestUtility.quickCheck() for a quick status check');
  console.log('Run EmailJSTestUtility.runFullTest() for a complete test');
}